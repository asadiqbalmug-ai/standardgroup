insert into public.partners (name, slug, sort_order, is_active, is_featured) values
  ('Milano',                'milano',                0,  true, true),
  ('GROHE',                 'grohe',                 1,  true, true),
  ('Jaquar',                'jaquar',                2,  true, true),
  ('Kludi Rak',             'kludi-rak',             3,  true, true),
  ('RAKCC',                 'rakcc',                 4,  true, true),
  ('UltraTech',             'ultratech',             5,  true, true),
  ('MAPEI',                 'mapei',                 6,  true, true),
  ('Weber Saint-Gobain',    'weber-saint-gobain',    7,  true, true),
  ('Emirates Steel',        'emirates-steel',        8,  true, true),
  ('Union Iron & Steel',    'union-iron-steel',      9,  true, true),
  ('Knauf',                 'knauf',                 10, true, true),
  ('Jotun',                 'jotun',                 11, true, true),
  ('National Paints',       'national-paints',       12, true, true),
  ('Asian Paints',          'asian-paints',          13, true, true),
  ('Calpeda',               'calpeda',               14, true, true),
  ('Wefatherm',             'wefatherm',             15, true, true)
on conflict (slug) do nothing;
