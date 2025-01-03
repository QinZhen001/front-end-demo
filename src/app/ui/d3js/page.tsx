"use client"

import * as d3 from "d3"
import type { SimulationNodeDatum } from "d3"
import { useEffect, useState } from "react"

interface CustomNode extends SimulationNodeDatum {
  id: string
  label: string
}

interface CustomEdge {
  id: string
  source: string
  target: string
  label: string
}

const SVG_ID = "d3-svg-test"

const D3jsPage = () => {
  const [showPopover, setShowPopover] = useState(false)
  const [popoverContent, setPopoverContent] = useState("")
  const [popoverX, setPopoverX] = useState(0)
  const [popoverY, setPopoverY] = useState(0)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    let url = "/test.graphml"
    const xmlData = await d3.xml(url)
    // 获取所有的节点和边
    const nodes: HTMLElement[] = Array.from(xmlData.querySelectorAll("node"))
    const edges: HTMLElement[] = Array.from(xmlData.querySelectorAll("edge"))
    const nodeData = genNodeData(nodes)
    const edgeData = genEdgeData(edges)

    console.log("nodeData111", nodeData)
    console.log("edgeData111", edgeData)

    // 使用 D3 渲染图形
    renderGraph(nodeData, edgeData)
  }

  const genNodeData = (nodes: HTMLElement[]): CustomNode[] => {
    // 转换节点
    return nodes.map(function (node: HTMLElement) {
      let id = node.getAttribute("id")
      let label = node?.querySelector('data[key="d0"]')?.textContent ?? ""
      return {
        id: id,
        label: label,
      } as CustomNode
    })
  }

  const genEdgeData = (edges: HTMLElement[]): CustomEdge[] => {
    return edges.map(function (edge: HTMLElement) {
      let label = edge.querySelector('data[key="d5"]')?.textContent ?? ""
      return {
        id: edge.getAttribute("id"),
        source: edge.getAttribute("source"),
        target: edge.getAttribute("target"),
        label: label,
      } as CustomEdge
    })
  }

  const renderGraph = (nodes: CustomNode[], edges: CustomEdge[]) => {
    const svgHtmlElement = document.querySelector(`#${SVG_ID}`)
    if (!svgHtmlElement) {
      return
    }

    const svg = d3.select(`#${SVG_ID}`)
    const width = svgHtmlElement.clientWidth
    const height = svgHtmlElement.clientHeight

    // 创建缩放行为
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5]) // 设置缩放的最小和最大比例
      .on("zoom", (event) => {
        svg
          .selectAll("*") // 选择所有元素
          .attr("transform", event.transform) // 应用变换
      })

    // 应用缩放行为到 SVG
    // @ts-ignore
    svg.call(zoom)

    const simulation = d3
      .forceSimulation(nodes)
      //  处理节点之间的链接。
      .force(
        "link",
        d3.forceLink(edges).id((d) => (d as CustomNode).id),
      )
      // .distance(100))
      // 处理节点之间的斥力或引力。
      .force("charge", d3.forceManyBody()) //  .strength(-100)
      // 分别将节点拉向特定的 x 和 y 坐标。
      .force("center", d3.forceCenter(width / 2, height / 2))

    const dragstarted = (
      event: d3.D3DragEvent<SVGCircleElement, CustomNode, unknown>,
      d: CustomNode,
    ) => {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    const dragged = (
      event: d3.D3DragEvent<SVGCircleElement, CustomNode, unknown>,
      d: CustomNode,
    ) => {
      d.fx = event.x
      d.fy = event.y
    }

    const dragended = (
      event: d3.D3DragEvent<SVGCircleElement, CustomNode, unknown>,
      d: CustomNode,
    ) => {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    const drag = d3
      .drag<SVGCircleElement, CustomNode>()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)

    // 绘制边
    const link = svg
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", "black")
      .attr("stroke-width", 2)

    // 绘制节点
    const node = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "lightblue")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .call(drag)

    // 绘制文字
    const text = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d: any) => {
        if (d.label.length > 1) {
          return d.label.slice(1, 2)
        }
        return ""
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .style("user-select", "none")
      .style("fill", "black")
      .style("font-size", "10px")

    simulation.on("tick", () => {
      text.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)

      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)
    })

    node.on("mouseenter", function (event, d: any) {
      d3.select(this as any).attr("fill", "red")
      const rect = event.target.getBoundingClientRect()
      console.log("rect", rect)
      if (d.id && !showPopover) {
        setPopoverContent(d.id)
        setShowPopover(true)
        setPopoverX(rect.x + rect.width / 2)
        setPopoverY(rect.y + rect.height / 2)
      }
    })

    node.on("mouseleave", function (event, d) {
      d3.select(this as any).attr("fill", "lightblue")
      if (showPopover) {
        setShowPopover(false)
        setPopoverContent("")
      }
    })

    link.on("mouseenter", function (event, d: any) {
      const rect = event.target.getBoundingClientRect()
      d3.select(this as any).attr("stroke", "red")
      if (d.label && !showPopover) {
        setPopoverContent(d.label)
        setShowPopover(true)
        setPopoverX(rect.x + rect.width / 2)
        setPopoverY(rect.y + rect.height / 2)
      }
    })

    link.on("mouseleave", function (event, d) {
      d3.select(this as any).attr("stroke", "black")
      if (showPopover) {
        setShowPopover(false)
        setPopoverContent("")
      }
    })
  }

  return (
    <div className="">
      <div>支持节点拖拽</div>
      <div>支持两指缩放</div>
      <svg className="h-[660px] w-[660px] bg-slate-100" id={SVG_ID}></svg>
      {showPopover ? (
        <div
          className="fixed max-h-12 w-40 overflow-hidden text-ellipsis rounded-sm border border-cyan-500 bg-slate-200"
          style={{ left: popoverX, top: popoverY }}
        >
          {popoverContent}
        </div>
      ) : null}
    </div>
  )
}

export default D3jsPage
