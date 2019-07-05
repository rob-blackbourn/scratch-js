# mui-data-table-react

## Overview

A react data-table component.


## Usage

Assuming we want a table of the following data.

```js
rows = [
    { id: 1, name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
    { id: 2, name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
]
```

We can define the columns as following.

```js
const columns = [
  {
    field: 'name',
    title: 'Name',
    disablePadding: false,
    numeric: false,
    formatter: null
  },
  {
    field: 'band',
    title: 'Band',
    disablePadding: false,
    numeric: false,
    formatter: null
  },
  {
    field: 'founded',
    title: 'Founded',
    disablePadding: false,
    numeric: true,
    formatter: (value, row) => `${row.band} founded in ${value}`
  }
]
```

We can make the table in the following way.

```js
<DataTable
  columns={Sessions.columns}
  unique='id'
  selected={rows}
  orderBy='name'
  showSelectable={false}
  enableSelection={false}
/>
```

The following properties exist:

| Name               | Description                                       | Type   | Default |
| ------------------ | ------------------------------------------------- | ------ | ------- |
| columns            | The column meta-data                              | array  |         |
| unique             | The unique field in the data                      | string |         |
| selected           | The selected rows                                 | array  |         |
| unselected         | The unselected rows                               | array  | []      |
| actions            | Menu actions                                      | array  | []      |
| orderBy            | The field by which to order                       | string |         |
| onAction           | The function called when a menu action is invoked | func   |         |
| enableSelection    | If true, enable selection                         | bool   | false   |
| showSelectable     | If true enable a swicth to toggle selection       | bool   | true    |
| onSelectionChanged | A function called when the selection is changed   | func   |         |

Note that the rows are split into two arrays, `selected` and `unselected`. It is the callers
responsibility to maintain this by observing the `onSelectionChanged` callback.
