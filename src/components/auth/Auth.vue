<template>
	<div class="vk-auth">
		<a :href="uri">
			Auth to VK
		</a>
	</div>
</template>

<script>
	export default {
		name: 'VkAuth',

		data() {
			return {
				baseUrl: 'https://oauth.vk.com/authorize',
				apiId: 6240559,
				display: 'page',
				redirectUri: 'https://beraliv.github.io/vk-friend-graph',
				scope: 'friends',
				responseType: 'token',
				version: '5.52'
			};
		},

		computed: {
			uri() {
				const clientId = `client_id=${this.apiId}`;
				const display = `display=${this.display}`;
				const redirect = `redirect_uri=${this.redirectUri}`;
				const scope = `scope=${this.scope}`;
				const responseType = `response_type=${this.responseType}`;
				const version = `v=${this.version}`;

				const params = [clientId, display, redirect, scope, responseType, version];

				return `${this.baseUrl}?${params.join('&')}`;
			}
		}
	}
</script>

<style>

</style>