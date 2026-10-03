// Responsive derivatives of the supplied originals; no synthetic upscaling.
import type { StoryAsset } from "@/components/caseStory/CaseStory";
import wind480 from "./wind-480.webp";
import wind960 from "./wind-960.webp";
import wind1200 from "./wind-1200.webp";
import grass480 from "./grass-480.webp";
import grass960 from "./grass-960.webp";
import grass1200 from "./grass-1200.webp";
import walking480 from "./walking-480.webp";
import walking899 from "./walking-899.webp";
import together480 from "./together-480.webp";
import together960 from "./together-960.webp";
import together1000 from "./together-1000.webp";
import surf480 from "./surf-480.webp";
import surf750 from "./surf-750.webp";
import laugh480 from "./laugh-480.webp";
import laugh735 from "./laugh-735.webp";
import trek480 from "./trek-480.webp";
import trek960 from "./trek-960.webp";
import trek1200 from "./trek-1200.webp";
import camp480 from "./camp-480.webp";
import camp733 from "./camp-733.webp";
import flowers480 from "./flowers-480.webp";
import flowers960 from "./flowers-960.webp";
import flowers1146 from "./flowers-1146.webp";
import city480 from "./city-480.webp";
import city960 from "./city-960.webp";
import city1199 from "./city-1199.webp";
import now480 from "./now-480.webp";
import now960 from "./now-960.webp";
import now970 from "./now-970.webp";
import sketchbook480 from "./sketchbook-480.webp";
import sketchbook960 from "./sketchbook-960.webp";
import sketchbook2400 from "./sketchbook-2400.webp";
import takeWithYou480 from "./takeWithYou-480.webp";
import takeWithYou960 from "./takeWithYou-960.webp";
import takeWithYou2400 from "./takeWithYou-2400.webp";

export const storyImages = {
  wind: { src: wind1200, srcSet: `${wind480} 480w, ${wind960} 960w, ${wind1200} 1200w`, width: 1200, height: 675 },
  grass: { src: grass1200, srcSet: `${grass480} 480w, ${grass960} 960w, ${grass1200} 1200w`, width: 1200, height: 1500 },
  walking: { src: walking899, srcSet: `${walking480} 480w, ${walking899} 899w`, width: 899, height: 1200 },
  together: { src: together1000, srcSet: `${together480} 480w, ${together960} 960w, ${together1000} 1000w`, width: 1000, height: 666 },
  surf: { src: surf750, srcSet: `${surf480} 480w, ${surf750} 750w`, width: 750, height: 500 },
  laugh: { src: laugh735, srcSet: `${laugh480} 480w, ${laugh735} 735w`, width: 735, height: 511 },
  trek: { src: trek1200, srcSet: `${trek480} 480w, ${trek960} 960w, ${trek1200} 1200w`, width: 1200, height: 802 },
  camp: { src: camp733, srcSet: `${camp480} 480w, ${camp733} 733w`, width: 733, height: 480 },
  flowers: { src: flowers1146, srcSet: `${flowers480} 480w, ${flowers960} 960w, ${flowers1146} 1146w`, width: 1146, height: 1184 },
  city: { src: city1199, srcSet: `${city480} 480w, ${city960} 960w, ${city1199} 1199w`, width: 1199, height: 1491 },
  now: { src: now970, srcSet: `${now480} 480w, ${now960} 960w, ${now970} 970w`, width: 970, height: 970 },
  sketchbook: { src: sketchbook2400, srcSet: `${sketchbook480} 480w, ${sketchbook960} 960w, ${sketchbook2400} 2400w`, width: 2400, height: 1200 },
  takeWithYou: { src: takeWithYou2400, srcSet: `${takeWithYou480} 480w, ${takeWithYou960} 960w, ${takeWithYou2400} 2400w`, width: 2400, height: 1800 },
} satisfies Record<string, StoryAsset>;
