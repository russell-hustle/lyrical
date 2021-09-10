import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		dark: true,
		themes: {
			dark: {
				primary: colors.green //#4CAF50 or 'map-get($green, base)' as scss
			},
			light: {
				primary: colors.green
			}
		}
	}
});
