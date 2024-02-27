//module.exports = () => ({});

module.exports = ({ env }) => ({
    // ...
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'korwit85@gmail.com',
          defaultReplyTo: 'korwit85@gmail.com',
        },
      },
    },
    // ...
  });