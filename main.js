document.addEventListener("DOMContentLoaded", async (e) => {
	let videoEl = document.querySelector("video");
	let subtitles = await fetch("esartee.json").then((e) => e.json());
	console.log(subtitles);
	let subtlinterval = null;
	const syncText = () => {
		console.log("sync", videoEl.currentTime);
		let subTlToShow = subtitles.find((e) => videoEl.currentTime >= e.stime && videoEl.currentTime < e.etime);
		if (subTlToShow) {
			document.querySelector(".subtitle").innerHTML = subTlToShow.text;
		}
	};
	videoEl.addEventListener("play", (e) => {
		console.log("on play");
		subtlinterval = setInterval(syncText, 1000 / 29);
	});
	videoEl.addEventListener("pause", (e) => {
		clearInterval(subtlinterval);
	});
	videoEl.play();
});
