import * as migration_20261010_195915_initial_cms from './20261010_195915_initial_cms';
import * as migration_20261010_201341_cloudinary_media from './20261010_201341_cloudinary_media';
import * as migration_20261010_202902_selected_work from './20261010_202902_selected_work';
import * as migration_20261011_000000_seed_insights from './20261011_000000_seed_insights';

export const migrations = [
  {
    up: migration_20261010_195915_initial_cms.up,
    down: migration_20261010_195915_initial_cms.down,
    name: '20261010_195915_initial_cms',
  },
  {
    up: migration_20261010_201341_cloudinary_media.up,
    down: migration_20261010_201341_cloudinary_media.down,
    name: '20261010_201341_cloudinary_media',
  },
  {
    up: migration_20261010_202902_selected_work.up,
    down: migration_20261010_202902_selected_work.down,
    name: '20261010_202902_selected_work',
  },
  {
    up: migration_20261011_000000_seed_insights.up,
    down: migration_20261011_000000_seed_insights.down,
    name: '20261011_000000_seed_insights'
  },
];
