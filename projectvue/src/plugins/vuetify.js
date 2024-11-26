// src/plugins/vuetify.js
// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';

// export default createVuetify({
//     components,
//     directives,
// });
import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles

const vuetify = createVuetify();

export default vuetify;