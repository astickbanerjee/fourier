const showdown = require('showdown');
const mustache = require('mustache');
const fs = require('fs');

const pageData = [
    { // English
        languageName: 'English',
        markdownFileName: 'content.md',
        title: 'An Interactive Introduction to Fourier Transforms',
        description: 'Fourier transforms are a tool used in a whole bunch of different things. This is a explanation of what a Fourier transform does, and some different ways it can useful. And how you can make pretty things with it, like this thing:',
        outFileName: 'index.html',
        url: '',
        translatorMarkdown: '',
    },
    { // Spanish
        languageName: 'Español',
        markdownFileName: 'content-es.md',
        title: 'Una introducción interactiva a las transformadas de Fourier',
        description: 'Las transformadas de Fourier son una herramienta utilizada en un montón de cosas diferentes. Esta es una explicación de lo que hace una transformada de Fourier, algunas formas diferentes en que puede ser útil y cómo puedes hacer cosas bonitas con ella, como esta cosa:',
        outFileName: 'es.html',
        url: '/es.html',
        translatorMarkdown: 'Traducido por [Juan Carlos Ponce Campuzano](https://www.jcponce.com)',
    },
    { // Debug
        markdownFileName: 'debug.md',
        title: 'debug debug debug',
        description: 'debugbugbugbugbugbugbugbug',
        outFileName: 'debug.html',
        url: '/debug.html',
        translatorMarkdown: '',
    },
]

const contentDir = 'content/'
const buildDir = 'build/';

const markdownConverter = new showdown.Converter();

const template = fs.readFileSync('template.html').toString();

for (pageDatum of pageData) {
    console.log(`generating ${pageDatum.markdownFileName}`)
    // Read in content
    const markdown = fs.readFileSync(contentDir + pageDatum.markdownFileName).toString();

    // Convert to html
    const htmlContent = markdownConverter.makeHtml(markdown);
    const translator = markdownConverter.makeHtml(pageDatum.translatorMarkdown);

    // Fill into template
    const view = Object.assign({}, pageDatum);
    view.content = htmlContent;
    view.translator = translator;

    const html = mustache.render(template, view)
    // Output to build directory;
    fs.writeFileSync(buildDir + pageDatum.outFileName, html)
}