export default function renderHtmlAsText(html: string): string {
	const element = document.createElement('div');
	element.innerHTML = html;
	return element.innerText;
}
