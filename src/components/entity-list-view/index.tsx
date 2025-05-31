import * as React from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import {
  Typography,
  TableHead,
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  TableContainer,
  Toolbar,
  Tooltip,
  TextField,
  InputAdornment,
  Popover,
  Button,
  TableSortLabel,
  FormControlLabel,
  Chip,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { IconFilter, IconSearch, IconTrash, IconPencil, IconEye, IconX } from '@tabler/icons-react';
import { visuallyHidden } from '@mui/utils';
import CustomSwitch from '@/components/forms/theme-elements/CustomSwitch';
import Breadcrumb from '@/layouts/full/shared/breadcrumb/Breadcrumb';
import CustomCheckbox from '@/components/forms/theme-elements/CustomCheckbox';
import PageContainer from '@/components/container/PageContainer';
import ParentCard from '@/components/shared/ParentCard';
import BlankCard from '@/components/shared/BlankCard';
import EmptyData from '@/assets/images/empty/no-data.webp';
import CustomExSwitch from '../forms/form-elements/switch/Custom';
import { ConfirmAlert } from '@/components/dialogs';

const EnhancedTableToolbar = (props: any) => {
  const { numSelected, search, filterComponent, isFilterClose } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  React.useEffect(() => {
    if (isFilterClose) handleClose();
  }, [isFilterClose]);

  const [localValue, setLocalValue] = React.useState(search?.value || '');
  const minChars = search?.minChars ?? 3;
  const debounceTime = search?.debounceTime ?? 300;

  // Memoized debounce function
  const debounce = React.useMemo(() => {
    return <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
      let timer: NodeJS.Timeout;
      return (...args: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };
  }, []);

  // Debounced search handler
  const debouncedSearch = React.useMemo(() => {
    if (!search?.onSearchChange) return () => {};
    return debounce((value: string) => {
      if (value.trim().length >= minChars || value.trim().length === 0) {
        search.onSearchChange(value);
      }
    }, debounceTime);
  }, [debounce, search?.onSearchChange, minChars, debounceTime]);

  // Sync local state when external value changes
  React.useEffect(() => {
    setLocalValue(search?.value || '');
  }, [search?.value]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);
    debouncedSearch(value);
  };

  if (!search) return null;

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          pb: { sm: 2 },
          minHeight: '36px !important',
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Box sx={{ flex: '1 1 100%' }}>
            {search && (
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="1.1rem" />
                    </InputAdornment>
                  ),
                }}
                placeholder={search.placeholder}
                value={localValue}
                size="small"
                onChange={handleChange}
              />
            )}
          </Box>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <IconTrash width="18" />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            {filterComponent && (
              <Box>
                <Tooltip title="Filter list">
                  <IconButton aria-describedby={id} onClick={handleClick}>
                    {open ? <IconX size="1.2rem" /> : <IconFilter size="1.2rem" />}
                  </IconButton>
                </Tooltip>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    sx: {
                      p: 2,
                      bgcolor: 'background.paper',
                      boxShadow: 3,
                    },
                  }}
                >
                  <Box p={2}>{filterComponent}</Box>
                </Popover>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </>
  );
};

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 1);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page + 1 - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1 + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(1, Math.ceil(count / rowsPerPage)));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface EntityListViewProps<T, U> {
  title: string;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onLimitChange: (page: number) => void;
  buttonHandlerOnClick: (action: string, params?: any) => void;
  onSortChange: (sortBy: string, order: 'asc' | 'desc') => void;
  sort: { by: string; order: 'asc' | 'desc' };
  data: T[];
  isFilterClose?: boolean;
  filterComponent?: React.ReactNode;
  display: U[];
  search?: {
    placeholder: string;
    value: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  buttonSettings?: any;
  setting?: any;
}

interface LocationState {
  successMessage?: string;
}

const EntityListView = <T, U>({
  title,
  data,
  isLoading,
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onSortChange,
  onLimitChange,
  sort,
  display,
  buttonSettings,
  setting,
  buttonHandlerOnClick,
  isFilterClose,
  search,
  filterComponent,
}: EntityListViewProps<T, U>) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  // console.log('isFilterClose 2', isFilterClose);
  const [dense, setDense] = React.useState(true);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = currentPage > 0 ? Math.max(0, pageSize - data.length) : 0;
  // console.log('data', data);

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [confirmStatusOpen, setConfirmStatusOpen] = React.useState(false);
  const [confirmData, setConfirmData] = React.useState<any | null>(null);

  const handleChangePage = (event: any, newPage: any) => {
    onPageChange(newPage);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = sort.by === property && sort.order === 'asc';
    onSortChange(property, isAsc ? 'desc' : 'asc');
  };
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleChangeRowsPerPage = (event: any) => {
    onLimitChange(parseInt(event.target.value, 10));
    onPageChange(1); // Ensure the first page is 1
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected: string[] = data.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // This is for the single row sleect
  const handleClick = (event: React.MouseEvent, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = []; // Changed from [] to string[]

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleConfirmCancel = () => {
    setConfirmStatusOpen(false);
    setConfirmDeleteOpen(false);
    setConfirmData(null);
  };

  const handleConfirmRecord = async (eventType: string) => {
    if (confirmData) {
      try {
        buttonHandlerOnClick(eventType, confirmData);
      } catch (error) {
        console.log(`Error ${eventType} record: `, error);
      } finally {
        setConfirmStatusOpen(false);
        setConfirmDeleteOpen(false);
        setConfirmData(null);
      }
    }
  };

  return (
    <>
      <PageContainer title={title} description={title}>
        {/* breadcrumb */}
        <Breadcrumb
          title={title}
          items={[
            {
              to: '/',
              title: 'Home',
            },
            {
              title: title,
            },
          ]}
        />

        {/* end breadcrumb */}
        <EnhancedTableToolbar
          isFilterClose={isFilterClose}
          filterComponent={filterComponent}
          numSelected={selected.length}
          search={search}
        />

        <ParentCard
          title={title}
          create={buttonSettings?.create}
          buttonClick={() => {
            buttonHandlerOnClick('create');
          }}
          cardContentSx={{ padding: 0, pb: '0px !important' }}
        >
          <BlankCard>
            <TableContainer
              sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' }, maxHeight: 520 }}
            >
              <Table
                stickyHeader
                aria-label={title}
                sx={{
                  whiteSpace: 'nowrap',
                  px: '10px',
                }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <TableHead>
                  <TableRow key={0}>
                    {setting?.checkbox && (
                      <TableCell padding="checkbox" width={50}>
                        <CustomCheckbox
                          color="primary"
                          checked={data.length > 0 && selected.length === data.length}
                          onChange={handleSelectAllClick}
                          inputProps={{
                            'aria-label': 'select all desserts',
                          }}
                        />
                      </TableCell>
                    )}
                    {setting?.srNo && (
                      <TableCell key={0} width={100} align="center">
                        <Typography variant="h6">Sr. No.</Typography>
                      </TableCell>
                    )}
                    {display.map((column: any, columnInd: number) => (
                      <TableCell
                        key={columnInd + 1}
                        sortDirection={
                          column.isSort !== false && sort.by === column.key ? sort.order : false
                        }
                        width={column?.width ? column.width : 200}
                      >
                        {column.isSort === false ? (
                          <Typography variant="h6">{column.label}</Typography>
                        ) : (
                          <TableSortLabel
                            active={sort.by === column.key}
                            direction={sort.by === column.key ? sort.order : 'asc'}
                            onClick={() => handleRequestSort(column.key)}
                          >
                            <Typography variant="h6">{column.label}</Typography>
                            {sort.by === column.key ? (
                              <Box component="span" sx={visuallyHidden}>
                                {sort.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                              </Box>
                            ) : null}
                          </TableSortLabel>
                        )}
                      </TableCell>
                    ))}
                    <TableCell key={display.length + 1}>
                      <Typography variant="h6">Action</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow key={data.length + 1} style={{ height: 46 * pageSize }}>
                      <TableCell colSpan={display.length + 3} align="center">
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          py={4}
                        >
                          <Typography variant="subtitle1">Loading...</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (data ?? []).length ? (
                    <>
                      {(data ?? []).map((row: any, index: number) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow key={row.id || index} role="checkbox">
                            {setting?.checkbox && (
                              <TableCell padding="checkbox" width={50}>
                                <CustomCheckbox
                                  color="primary"
                                  checked={isItemSelected}
                                  onClick={(event) => handleClick(event, row.id)}
                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                                />
                              </TableCell>
                            )}
                            {setting?.srNo && (
                              <TableCell align="center" width={100}>
                                {(currentPage - 1) * pageSize + index + 1}
                              </TableCell>
                            )}
                            {display.map((column: any, columnInd: number) => (
                              <>
                                {column?.badge ? (
                                  <TableCell>
                                    {/* <Chip chipcolor={basic.status == 'Active' ? 'success' : basic.status == 'Pending' ? 'warning' : basic.status == 'Completed' ? 'primary' : basic.status == 'Cancel' ? 'error' : 'secondary'} */}
                                    <Chip
                                      sx={{
                                        bgcolor:
                                          row?.[column.key] === true
                                            ? (theme) => theme.palette.success.light
                                            : (theme) => theme.palette.error.light,
                                        color:
                                          row?.[column.key] === true
                                            ? (theme) => theme.palette.success.main
                                            : (theme) => theme.palette.error.main,
                                        borderRadius: '8px',
                                      }}
                                      size="small"
                                      label={row?.[column.key] ? 'Active' : 'InActive'}
                                    />
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    key={`${row.id}-${column.key}`}
                                    sx={{
                                      maxWidth: column?.width ? column.width : 200,
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                    }}
                                  >
                                    <Typography variant="subtitle2" noWrap>
                                      {(() => {
                                        // Get the value (supports nested keys)
                                        const value = column.key.includes('.')
                                          ? column.key
                                              .split('.')
                                              .reduce(
                                                (acc: any, key: string) =>
                                                  acc && typeof acc === 'object'
                                                    ? acc[key]
                                                    : undefined,
                                                row,
                                              )
                                          : row?.[column.key];

                                        // Check if value is a string and matches ISO datetime format
                                        if (
                                          typeof value === 'string' &&
                                          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(
                                            value,
                                          )
                                        ) {
                                          const date = new Date(value);
                                          // Format as DD/MM/YYYY HH:mm (24-hour, two-digit day)
                                          return date.toLocaleString(undefined, {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false,
                                          });
                                          // Format as local date and time string
                                          // return date.toLocaleString();
                                        }

                                        return value;
                                      })()}
                                    </Typography>
                                  </TableCell>
                                )}
                              </>
                            ))}
                            <TableCell sx={{ display: 'flex', gap: '8px' }}>
                              {buttonSettings?.status && (
                                <CustomExSwitch
                                  checked={row?.is_active === true || row?.isActive === true}
                                  onCheck={(value) => {
                                    setConfirmData(row);
                                    setConfirmStatusOpen(true);
                                  }}
                                />
                              )}

                              {buttonSettings?.edit && (
                                <Button
                                  color="primary"
                                  onClick={() => {
                                    buttonHandlerOnClick('edit', row);
                                  }}
                                  variant="outlined"
                                  sx={{ p: '5px', minWidth: '40px', borderRadius: '5px' }}
                                >
                                  <IconPencil width={18} />
                                </Button>
                              )}
                              {buttonSettings?.view && (
                                <Button
                                  color="secondary"
                                  variant="outlined"
                                  onClick={() => {
                                    buttonHandlerOnClick('view', row);
                                  }}
                                  sx={{ px: '5px', minWidth: '40px', borderRadius: '5px' }}
                                >
                                  <IconEye width={18} />
                                </Button>
                              )}
                              {buttonSettings?.delete && (
                                <Button
                                  color="error"
                                  variant="outlined"
                                  onClick={() => {
                                    setConfirmData(row);
                                    setConfirmDeleteOpen(true);
                                  }}
                                  sx={{ px: '5px', minWidth: '40px', borderRadius: '5px' }}
                                >
                                  <IconTrash width={18} />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}

                      {emptyRows > 0 && (
                        <TableRow key={data.length + 1} style={{ height: 48 * emptyRows }}>
                          <TableCell colSpan={7} />
                        </TableRow>
                      )}
                    </>
                  ) : (
                    <TableRow key={data.length + 1} style={{ height: 48 * pageSize }}>
                      <TableCell colSpan={display.length + 3} align="center">
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          py={4}
                        >
                          <img src={EmptyData} width={200} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <>
              {(data ?? []).length > 0 && (
                <TableFooter sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <FormControlLabel
                      sx={{ ml: 3 }}
                      control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
                      label="Dense padding"
                    />
                  </Box>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50, 100]}
                      colSpan={7}
                      count={totalCount}
                      rowsPerPage={pageSize}
                      page={currentPage - 1}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              '& .MuiMenuItem-root': {
                                justifyContent: 'center',
                                textAlign: 'center',
                                px: 3,
                              },
                            },
                          },
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              )}
            </>
          </BlankCard>
        </ParentCard>
      </PageContainer>
      <ConfirmAlert
        open={confirmDeleteOpen}
        title="Delete Record"
        description="Are you sure you want to delete this record?"
        onConfirm={() => handleConfirmRecord('delete')}
        onCancel={handleConfirmCancel}
      />
      <ConfirmAlert
        open={confirmStatusOpen}
        title="Delete Record"
        description="Are you sure you want to change status for this record?"
        onConfirm={() => handleConfirmRecord('status')}
        onCancel={handleConfirmCancel}
      />
    </>
  );
};

export default EntityListView;
