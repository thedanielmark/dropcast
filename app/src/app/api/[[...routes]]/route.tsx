const app = new Frog<{ State: State }>({
  title: 'Private Poll',
  assetsPath: '/',
  basePath: '/api',
  initialState: {
    question: '',
    options: {
      a: '',
      b: '',
      c: '',
      d: ''
    },
    optionsCreated: 0,
    theme: 0,
    validity: {
      day: 0,
      hours: 0,
      minutes: 0
    }
  },
  imageOptions: {
    fonts: [{ name: 'Krona One', source: 'google' }]
  }
});
app.composerAction(
  '/composer',
  (c) => {
    return c.res({
      title: 'Dropify',
      url: 'https://dropify.thedanielmark.app/'
    });
  },
  {
    name: 'Dropify Composer action',
    description: 'Create airdrops like a pro',
    icon: 'image',
    imageUrl: 'https://dropify.thedanielmark.app/logo.png'
  }
);
