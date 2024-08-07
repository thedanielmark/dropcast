import { Frog } from 'frog';

const app = new Frog({ title: 'Frog Frame' });

app.composerAction(
  '/',
  (c) => {
    return c.res({
      title: 'My Composr Action',
      url: 'https://example.com'
    });
  },
  {
    name: 'Some Composer Action',
    description: 'Cool Composer Action',
    icon: 'image',
    imageUrl: 'https://frog.fm/logo-light.svg'
  }
);
