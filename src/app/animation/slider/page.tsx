import EmblaCarousel from "./components/EmblaCarousel"

const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Slider = () => {
  return <EmblaCarousel slides={SLIDES} />
}

export default Slider
