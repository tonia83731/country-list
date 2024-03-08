# Country List (with Color Theme)

This project is completed through React + Vite, integrating with the [REST Countries API](https://restcountries.com) to show country data and display base on design file.

The project was made for mainly practice typescript and @tanstack/react-table.

## The Feature

- User could view the country summarized in HomePage. When click on country name, the website will direct to country detail.
- User could use search bar to find country by type in country name.
- User could use dropdown menu to filter country data by region.
- User could switch mode by clicking on the mode on Header.
- In country detail page, user could see country flag image, official name, native name, population, region, sub region, top level domain, currencies, languages and border countries.
- In detail page by click on border country lists button, the website will guide you to another border country.
- At home page by search bar, there is a button that could direct to table page.
- User could see country id, code, name, region, captial, population and area in the table page.
- User could click on table header to sort the table.

## Environment

- node @20.11.1
- react @18.2.0'
- react-router-dom @6.22.2
- axios @1.6.7
- react-loader-spinner @6.6.1
- tailwindCSS @3.4.1
- typescript @5.2.2

## Getting Start

1. Clone the project to local, enter:

```
git clone https://github.com/tonia83731/country-list.git
```

2. Go into the project(cd), later enter to install npm:

```
npm install
```

3. Start the project by enter:

```
npm run dev
```

4. If you wish to end the project, enter:

```
ctrl + c
```

## Further Development

- Still figure out the error in Table Page cannot define the "columns" type when using react-table
