import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import CheckBox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import Toolbar from '@material-ui/core/Toolbar'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import TablePaginationActions from './TablePaginationActions'
import ParameterDialog from './ParameterDialog'
import { stableSort, getSorting } from './sorting'
import { stableFilter } from './filter'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  toolbarRoot: {
    padding: 0
  },
  toolbarHightlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  toolbarTtitle: {
    flex: '0 0 auto'
  },
  toolbarSpacer: {
    flex: '1 1 100%'
  },
  toolbarActions: {
    color: theme.palette.text.secondary
  },
  toolbarFilter: {
    margin: 0,
    width: 300
  },
  toolbarToggleSelectable: {
    margin: theme.spacing.unit
  },
  menuParameter: {
    margin: theme.spacing.unit,
    width: 50,
    float: 'right'
  }
})

class DataTable extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,
      rowsPerPage: 10,
      order: 'asc',
      orderBy: this.props.orderBy || null,
      filterText: '',
      menuElement: null,
      paramAction: null
    }
  }

  handleChangePage = page => this.setState({ page })

  handleChangeRowsPerPage = rowsPerPage => this.setState({ rowsPerPage })

  notifySelectionChanged = (selected, unselected) => {
    if (this.props.onSelectionChanged) {
      this.props.onSelectionChanged(selected, unselected)
    }
  }

  handleSelectAllClick = (
    isInvert,
    isChecked,
    selected,
    unselected,
    filteredRows
  ) => {
    const allRows = selected.concat(unselected)
    const unfilteredRows = allRows.filter(row => !filteredRows.includes(row))

    const filteredSelected = filteredRows.filter(row => selected.includes(row))
    const filteredUnselected = filteredRows.filter(
      row => !selected.includes(row)
    )

    const unfilteredSelected = unfilteredRows.filter(row =>
      selected.includes(row)
    )
    const unfilteredUnselected = unfilteredRows.filter(
      row => !selected.includes(row)
    )

    if (isInvert) {
      this.notifySelectionChanged(
        filteredUnselected.concat(unfilteredSelected),
        filteredSelected.concat(unfilteredUnselected)
      )
    } else {
      const toggledSelected = isChecked
        ? unfilteredSelected.concat(filteredRows)
        : unfilteredSelected
      const toggleUnselected = isChecked
        ? unfilteredUnselected
        : unfilteredUnselected.concat(filteredRows)

      this.notifySelectionChanged(toggledSelected, toggleUnselected)
    }
  }

  handleClick = (selected, unselected, row) => {
    if (selected.includes(row)) {
      this.notifySelectionChanged(selected.filter(r => r !== row), [
        ...unselected,
        row
      ])
    } else {
      this.notifySelectionChanged(
        [...selected, row],
        unselected.filter(r => r !== row)
      )
    }
  }

  handleRequestSort = field => {
    const orderBy = field
    let order = 'desc'

    if (this.state.orderBy === field && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleMenuOpen = event => {
    this.setState({ menuElement: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ menuElement: null })
  }

  handleMenuClick = (action, selected, unselected) => {
    if (action.paramType) {
      this.setState({ paramAction: action })
    } else {
      this.setState({ menuElement: null }, () =>
        this.props.onAction(action, selected, unselected)
      )
    }
  }

  handleParamDialogClose = (isOk, value) => {
    const action = this.state.paramAction

    this.setState({ menuElement: null, paramAction: null }, () => {
      if (isOk) {
        const { selected, unselected } = this.props
        return this.props.onAction(action, selected, unselected, value)
      }
    })
  }

  changeFilterText = event => {
    this.setState({ filterText: event.target.value, selected: [] })
  }

  clearFilterText = () => {
    this.setState({ filterText: '', selected: [] })
  }

  render () {
    const {
      classes,
      columns,
      unique,
      selected,
      unselected,
      actions,
      enableSelection,
      showSelectable
    } = this.props
    const {
      page,
      rowsPerPage,
      order,
      orderBy,
      filterText,
      menuElement,
      paramAction
    } = this.state

    const isSelectable = enableSelection || enableSelection === undefined

    const rows = selected.concat(unselected)
    const filteredRows = stableFilter(rows, columns, filterText)
    const filteredSelected = filteredRows.filter(row => selected.includes(row))

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage)

    const numSelected = isSelectable ? filteredSelected.length : 0
    const rowCount = filteredRows.length

    return (
      <div>
        <Toolbar
          className={classNames(classes.toolbarRoot, {
            [classes.toolbarHhighlight]: numSelected > 0
          })}
        >
          <TextField
            className={classes.toolbarFilter}
            label='Filter'
            value={filterText}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterText}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={this.changeFilterText}
          />
          {showSelectable ? (
            <FormControlLabel
              className={classes.toolbarToggleSelectable}
              control={
                <Switch
                  checked={this.state.isSelectable}
                  onChange={event =>
                    this.setState({ isSelectable: event.target.checked })
                  }
                />
              }
              label='Enable selection'
            />
          ) : null}
          <div className={classes.toolbarSpacer} />
          <div className={classes.toolbarActions}>
            {actions.length === 0 ? null : (
              <Fragment>
                <IconButton onClick={this.handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={menuElement}
                  open={Boolean(menuElement)}
                  onClose={this.handleMenuClose}
                >
                  {actions.map((action, index) => (
                    <MenuItem
                      key={index}
                      onClick={() =>
                        this.handleMenuClick(action, selected, unselected)
                      }
                      disabled={
                        !(
                          (isSelectable && action.isSelectable) ||
                          !action.isSelectable
                        )
                      }
                    >
                      {action.title + (action.paramType ? '...' : '')}
                    </MenuItem>
                  ))}
                </Menu>
              </Fragment>
            )}

            {paramAction === null ? null : (
              <ParameterDialog
                open={paramAction !== null}
                onClose={this.handleParamDialogClose}
                title={paramAction.title}
                name={paramAction.paramName}
                type={paramAction.paramType}
                message={paramAction.message}
                args={
                  !paramAction.argFactory
                    ? {}
                    : paramAction.argFactory(selected, unselected)
                }
              />
            )}
          </div>
        </Toolbar>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {isSelectable ? (
                <TableCell key='__selectAll' padding='checkbox'>
                  <Tooltip title='To invert press shift and click'>
                    <CheckBox
                      checked={numSelected === rowCount}
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      onChange={event =>
                        this.handleSelectAllClick(
                          event.nativeEvent.shiftKey,
                          event.target.checked,
                          selected,
                          unselected,
                          filteredRows
                        )
                      }
                    />
                  </Tooltip>
                </TableCell>
              ) : null}

              {columns.map(column => (
                <TableCell
                  key={column.field}
                  numeric={column.numeric}
                  padding={column.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === column.field ? order : false}
                >
                  <Tooltip
                    title='Sort'
                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={order}
                      onClick={() => this.handleRequestSort(column.field)}
                    >
                      {column.title}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(filteredRows, getSorting(order, orderBy, unique))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                const isSelected = isSelectable && selected.includes(row)
                return (
                  <TableRow
                    key={row.id}
                    aria-checked={isSelected}
                    role='checkbox'
                    selected={isSelected}
                    onClick={
                      isSelectable
                        ? () => this.handleClick(selected, unselected, row)
                        : undefined
                    }
                  >
                    {isSelectable ? (
                      <TableCell padding='checkbox'>
                        <CheckBox checked={isSelected} />
                      </TableCell>
                    ) : null}
                    {columns.map(column => (
                      <TableCell key={column.field} numeric={column.numeric}>
                        {column.formatter
                          ? column.formatter(row[column.field], row)
                          : row[column.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={columns.length} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={columns.length}
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={(event, page) => this.handleChangePage(page)}
                onChangeRowsPerPage={event =>
                  this.handleChangeRowsPerPage(event.target.value)
                }
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  unique: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  unselected: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  orderBy: PropTypes.string,
  onAction: PropTypes.func,
  enableSelection: PropTypes.bool,
  showSelectable: PropTypes.bool,
  onSelectionChanged: PropTypes.func
}

DataTable.defaultProps = {
  unselected: [],
  actions: [],
  enableSelection: false,
  showSelectable: true
}

export default withStyles(styles)(DataTable)
