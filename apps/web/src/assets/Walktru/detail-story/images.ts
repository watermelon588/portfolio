// Responsive derivatives of the supplied originals; no synthetic upscaling.
import type { StoryAsset } from "@/components/caseStory/CaseStory";
import focus480 from "./focus-480.webp";
import focus735 from "./focus-735.webp";
import cafe480 from "./cafe-480.webp";
import cafe750 from "./cafe-750.webp";
import commute480 from "./commute-480.webp";
import commute736 from "./commute-736.webp";
import phone480 from "./phone-480.webp";
import phone736 from "./phone-736.webp";
import hands480 from "./hands-480.webp";
import hands900 from "./hands-900.webp";
import reading480 from "./reading-480.webp";
import reading736 from "./reading-736.webp";
import late480 from "./late-480.webp";
import late897 from "./late-897.webp";
import strangers480 from "./strangers-480.webp";
import strangers960 from "./strangers-960.webp";
import strangers1200 from "./strangers-1200.webp";
import overload480 from "./overload-480.webp";
import overload960 from "./overload-960.webp";
import overload1200 from "./overload-1200.webp";
import perspective480 from "./perspective-480.webp";
import perspective736 from "./perspective-736.webp";
import secondLook480 from "./secondLook-480.webp";
import secondLook960 from "./secondLook-960.webp";
import secondLook1920 from "./secondLook-1920.webp";
import freshEyes480 from "./freshEyes-480.webp";
import freshEyes960 from "./freshEyes-960.webp";
import freshEyes1600 from "./freshEyes-1600.webp";

export const storyImages = {
  focus: { src: focus735, srcSet: `${focus480} 480w, ${focus735} 735w`, width: 735, height: 980 },
  cafe: { src: cafe750, srcSet: `${cafe480} 480w, ${cafe750} 750w`, width: 750, height: 750 },
  commute: { src: commute736, srcSet: `${commute480} 480w, ${commute736} 736w`, width: 736, height: 981 },
  phone: { src: phone736, srcSet: `${phone480} 480w, ${phone736} 736w`, width: 736, height: 920 },
  hands: { src: hands900, srcSet: `${hands480} 480w, ${hands900} 900w`, width: 900, height: 1200 },
  reading: { src: reading736, srcSet: `${reading480} 480w, ${reading736} 736w`, width: 736, height: 552 },
  late: { src: late897, srcSet: `${late480} 480w, ${late897} 897w`, width: 897, height: 1024 },
  strangers: { src: strangers1200, srcSet: `${strangers480} 480w, ${strangers960} 960w, ${strangers1200} 1200w`, width: 1200, height: 1200 },
  overload: { src: overload1200, srcSet: `${overload480} 480w, ${overload960} 960w, ${overload1200} 1200w`, width: 1200, height: 750 },
  perspective: { src: perspective736, srcSet: `${perspective480} 480w, ${perspective736} 736w`, width: 736, height: 736 },
  secondLook: { src: secondLook1920, srcSet: `${secondLook480} 480w, ${secondLook960} 960w, ${secondLook1920} 1920w`, width: 1920, height: 1080 },
  freshEyes: { src: freshEyes1600, srcSet: `${freshEyes480} 480w, ${freshEyes960} 960w, ${freshEyes1600} 1600w`, width: 1600, height: 2000 },
} satisfies Record<string, StoryAsset>;
