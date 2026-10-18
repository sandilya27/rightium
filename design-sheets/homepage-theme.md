# Homepage: Slate & Glacier

Approved direction: slate-glacier.png. Mode: Persuade. Scope: homepage and its header/footer presentation only. Other routes retain the incumbent system.

Palette: cool white #F1F5F5, midnight slate #202F3D, steel blue #49667C, glacier mint #A5D6CA. White text on steel blue; slate text on mint. Mint is a broad hero field and a dark-surface accent, rather than a small-text color on white.

Typography: existing self-hosted Newsreader for display headings and the wordmark; existing IBM Plex Sans for body and controls. No font download or additional dependency.

Composition: cool-white hero with existing messaging and actions, original animated 3D optical assembly on mint, slate statistics strip, existing section order and content. The hero stacks on small screens. The 3D scene retains its service callouts and pause/resume control, with steel-blue and mint materials.

Implementation: src/app/(frontend)/home.css; route-local home-slate marker activates inherited CSS custom properties through body:has(.home-slate). This also themes shared chrome only while the homepage is mounted. Header uses its existing solid treatment at the top of the light homepage.
