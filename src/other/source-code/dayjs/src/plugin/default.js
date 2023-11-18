// 插件的标准写法，可以新加方法也可以覆盖原有的方法


/**
 * @description: plugin
 * @param {Object} o option
 * @param {Class} c Dayjs类
 * @param {Function} d dayjs函数对象
 */
export default (o,c,d) => {
    const proto = c.prototype

    // ....
    proto.demo = function(args){

    }
}





