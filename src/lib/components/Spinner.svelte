<div aria-label="Loading..." role="status">
	<svg
		width="24"
		height="24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		viewBox="0 0 24 24"
		stroke-linecap="round"
		stroke-linejoin="round"
		xmlns="http://www.w3.org/2000/svg"
		class="w-8 h-8 animate-spin stroke-slate-400"
	>
		<path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"> </path>
	</svg>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		/* The animation part: */
		animation-name: spin;
		animation-duration: 1250ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
	@keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
</style>
