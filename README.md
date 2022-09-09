# codyhouse-tailwind-gulp

A little starter project when you want to use the awesome components from [CodyHouse](https://codyhouse.co/) with the wonderful [Tailwind CSS](https://tailwindcss.com/) for small static sites. It includes a [gulpfile.js](gulpfile.js) with watch tasks for local development and deploy tasks for deployment to production.
To better understand how the project structure works, the [Virgo template](https://codyhouse.co/template/virgo) from CodyHouse is included in this project as an example.

## Directory structure
```
┌── dev/
│   ├── css/
│   │   ├── components/ (add CSS files from components here)
│   │   ├── custom.css (add your custom CSS here)
│   │   ├── _index.css
│   │   ├── project.css (add codyhouse project styles here)
│   │   └── utilities.css (add your custom utilities here)
│   ├── html/ (add html files here)
│   ├── img/ (add images here)
│   └── js/
│       ├── components/ (add JS files from components here)
│       └── custom.js (add your custom JS here)
└── public/
    ├── css/
    │   ├── styles.css (dev CSS for local development)
    │   └── styles.min.css (optimized CSS for production)
    ├── img/ (contains optimized images)
    └── js/
        ├── scripts.js (dev JS for local development)
        └── scripts.min.js (optimized JS for production)
```

## Add project styles from CodyHouse
In [project.css](dev/css/project.css) you can insert your project styles from CodyHouse, which you can download from [your CodyHouse project](https://codyhouse.co/ds/export).

## Gulp tasks
- **gulp watch** watches your HTML, CSS and JS files and compile CSS and concat JS every time something has changed.
- **gulp deploy** moves, minifies, autoprefixes, renames your files to `public/` folder.

## Tailwind config
The [tailwind.config.js](tailwind.config.js) file contains everything required for CodyHouse to work properly, as described in [their docs](https://codyhouse.co/ds/docs/tailwind-css).
