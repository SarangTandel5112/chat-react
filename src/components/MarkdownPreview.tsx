// import { Remarkable } from 'remarkable';

// const md = new Remarkable();

export default function MarkdownPreview() {

    console.log("=========markdown================");

    return (
        <div
            className="content"
        // dangerouslySetInnerHTML={{ __html: md.render(markdown) }}
        >Hello world</div>
    );
}
