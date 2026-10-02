// Prompts for every illustration, fed to bytedance/seedream-4.5 by scripts/art/generate.mjs.
// Seedream cannot output transparency, so isolated things are drawn on flat chroma green
// and keyed out later by `npm run art`.

const STYLE =
  'Art style: cozy hand-painted 2D illustration for an indie life-sim game, soft cel shading with gentle painterly gradients, clean dark-brown line art of even weight, warm late-afternoon light from the upper left. Palette: royal blue, cream white, warm honey wood, sage green, soft sunset gold. Crisp, clean, high detail. No text, no letters, no logos, no watermark, no signature.';

const GREEN =
  'Background: a perfectly flat, solid pure chroma-key green (#00FF00) filling the whole image, with no gradient, no floor, no shadow and no other objects. Keep everything fully visible with a clear margin of green around it.';

const object = (description) =>
  `${description} Single object, centered, seen straight from the front at eye level (orthographic, no dramatic perspective). Even, soft lighting: no light rays, no sunbeams and no glow on the background. ${GREEN} ${STYLE}`;

const SHEET = 'art-raw/char-sheet.jpg';
const SAME = 'Keep the face, hair, outfit, colors and the tall, slim proportions (about 4.5 heads tall) exactly the same as the character in the reference sheet.';
const BUILD =
  'A grown-up young man, not a child: tall and slim, long legs, about 4.5 heads tall. Calm, composed, quietly confident expression with a slight closed-mouth smile; small simple eyes, no blush, no big sparkly eyes. Friendly but serious, not overly cute.';

const LIKENESS =
  'Keep his likeness: short black hair with a lot of volume on top, swept toward his right with the part on his left side, a few loose strands standing up at the crown; slightly protruding ears; straight, fairly thick eyebrows; calm, narrow single-lid eyes; a small gentle closed-mouth smile; light warm skin. Outfit: white long-sleeve button-up shirt with a band collar and a chest pocket, sleeves rolled up to just below the elbows, worn untucked; black slim trousers; white sneakers; a silver wristwatch on his left wrist.';

export const ASSETS = {
  'char-sheet': {
    aspect: '16:9',
    refs: ['art-raw/refs/style-tall.jpg', 'art-raw/refs/photo-1.jpg', 'art-raw/refs/photo-2.jpg', 'art-raw/refs/photo-3.jpg'],
    prompt: `Character design sheet. Match the art style, line work, flat colors and body proportions of the FIRST reference image (a three-view sheet of a tall, slim young man). Use the other reference photos only for this young Vietnamese man's face and hair. ${BUILD} ${LIKENESS} Show the full body three times side by side, all the same height and evenly spaced, each figure filling most of the image height: front view, three-quarter view, back view. Plain light background. Clean flat illustration with thin dark-brown outlines and subtle shading. No text, no logos, no watermark.`,
  },
  'char-stand': {
    aspect: '2:3',
    refs: [SHEET],
    prompt: `The same character as in the reference sheet. ${SAME} Full body, standing and facing the viewer, relaxed, right hand in the trouser pocket, left arm hanging naturally with the silver watch visible, gentle smile, looking at the viewer. One single character. ${GREEN} ${STYLE}`,
  },
  'char-wave': {
    aspect: '2:3',
    refs: [SHEET, 'art-raw/char-stand.jpg'],
    prompt: `The same character as in the reference images, with exactly the same size, framing and foot position as the standing pose. ${SAME} Standing and facing the viewer, waving hello with the left hand raised beside the head, palm open, silver watch visible, right hand still in the trouser pocket, happy open smile. One single character. ${GREEN} ${STYLE}`,
  },
  'char-window': {
    aspect: '1:1',
    refs: [SHEET],
    prompt: `The same character as in the reference sheet. ${SAME} Seen from the front, leaning on the sill of an open wooden window from inside the room, forearms resting on the sill, friendly smile. Only his upper body is visible above the sill; nothing of him appears below the window (no legs, no feet). Behind him a glimpse of a cozy room with a small bookshelf and warm light. The wooden window frame is part of the illustration. Everything outside the window frame is flat solid pure chroma-key green (#00FF00). ${STYLE}`,
  },
  'char-guitar': {
    aspect: '3:4',
    refs: [SHEET],
    prompt: `The same character as in the reference sheet. ${SAME} Sitting on a small wooden stool playing an acoustic guitar, eyes gently closed, singing softly, a few small music notes floating around. Full body, front three-quarter view. ${GREEN} ${STYLE}`,
  },
  'char-desk': {
    aspect: '4:3',
    refs: [SHEET],
    prompt: `The same character as in the reference sheet. ${SAME} Sitting on a black office chair at a small white desk, typing on an open silver laptop, focused but relaxed, three-quarter view from the front, a coffee mug and a tiny plant on the desk. ${GREEN} ${STYLE}`,
  },

  'scene-city': {
    aspect: '16:9',
    prompt: `View from a rooftop balcony over Ho Chi Minh City at golden hour. Foreground, bottom quarter of the image: an empty terracotta-tiled balcony floor and, just behind it, a waist-high wall of white Vietnamese breeze blocks with round and geometric cut-outs running across the full width, a few potted plants and small flowers at the far left and far right ends. The centre of the balcony floor is empty because a character will stand there. Beyond the wall: the Saigon River curving through the city with a few small boats, Landmark 81 tower and Bitexco Financial Tower clearly in the skyline, the cable-stayed Thu Thiem bridge, dense low-rise neighbourhoods with red-tile roofs and many trees. Warm sunset sky with big soft clouds. No people. Full-bleed, straight-on view at eye level. ${STYLE}`,
  },





  'obj-window': {
    aspect: '1:1',
    prompt: object(
      'A wooden window seen perfectly straight-on, with light linen curtains tied at both sides and a short curtain rod above; through the glass, the Ho Chi Minh City skyline at sunset with warm golden light. Only the window, curtains and rod; no wall around them.',
    ),
  },
  'obj-desk': {
    aspect: '1:1',
    refs: ['art-raw/refs/desk-setup.jpg'],
    prompt: object(
      "The work desk from the reference image, redrawn as a straight-on front view at eye level, like a side-scrolling game asset: we look at the front of the desk, so only a thin sliver of the desktop is visible, never seen from above. Walnut desk with a raised monitor shelf; on the shelf a monitor with a slim light bar on top (screen off, plain dark navy, nothing on it) and two small black bookshelf speakers at the ends; a MIDI keyboard under the shelf; on a grey felt mat a cream mechanical keyboard with teal accent keys, a white mouse and a closed space-grey laptop. The whole desk is visible including all legs. No chair, no person.",
    ),
  },
  'obj-duck': {
    aspect: '1:1',
    prompt: object('A small classic yellow rubber duck wearing tiny black-rimmed glasses, sitting, front three-quarter view, friendly and a little nerdy.'),
  },
  'obj-phone': { aspect: '2:3', prompt: object('An Android smartphone without any brand logo, standing upright on a small desk stand, the screen showing a colorful cartoon mobile game.') },
  'obj-guitar': { aspect: '9:16', prompt: object('A natural-wood acoustic guitar standing upright on a small black guitar stand, front view.') },
  'obj-mic': { aspect: '9:16', prompt: object('A silver vintage microphone on a tall black microphone stand with a round base.') },
  'obj-shelf': { aspect: '16:9', prompt: object('A floating light-wood wall shelf with a few colorful books standing on the left half and a small trailing plant; the right half of the shelf is empty.') },
  'obj-trophy': { aspect: '3:4', prompt: object('Only a small golden trophy cup on a dark wooden base with a blank golden plaque. The trophy stands alone: no person, no hands, no character, nothing else.') },
  'obj-pinboard': { aspect: '4:3', prompt: object('A wide rectangular cork board with a light wooden frame, completely empty: no notes, no pins, nothing on it.') },
  'obj-plant-left': { aspect: '2:3', prompt: object('A tall monstera plant in a cream ceramic pot.') },
  'obj-plant-right': { aspect: '2:3', prompt: object('A fiddle-leaf fig tree in a woven seagrass basket.') },
  'obj-rug': { aspect: '16:9', prompt: object('A round woven rug seen from a low front angle so it looks like a wide flat ellipse, cream with a sunset-orange and royal-blue border pattern.') },
};
