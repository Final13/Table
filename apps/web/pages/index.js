import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import youtubeChannels from './youtubeMock';

import { Box } from '@mui/material';

const InfluencerTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(youtubeChannels.map(channel => ({
      title: channel?.channelInfo?.title,
      country: channel?.channelInfo?.country,
      avatar: channel?.channelInfo?.avatar,
      subscribers: channel?.channelInfo?.subscribers,
      avgViews: channel?.average?.analytics?.views,
    })).filter(({avgViews}) => avgViews > 0));
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Title',
        accessorKey: 'title',
        filterVariant: 'text',
        enableSorting: false,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
        size: 170,
      },
      {
        header: 'Country',
        accessorKey: 'country',
        filterVariant: 'text',
        enableSorting: false,
        Cell: ({ cell }) => cell.getValue(),
        size: 170,
      },
      {
        accessorKey: 'subscribers',
        header: 'Subscribers',
        filterVariant: 'range',
        filterFn: 'between',
        Cell: ({ cell }) => cell.getValue().toLocaleString(),
        size: 170,
      },
      {
        accessorKey: 'avgViews',
        header: 'Avg Views',
        filterVariant: 'range',
        filterFn: 'between',
        Cell: ({ cell }) => cell.getValue().toLocaleString(),
        size: 170,
      },
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { showColumnFilters: true },
  });

  return <MaterialReactTable table={table} />;
};

const Table = () => (
  <div style={{ padding: 50 }}>
    <InfluencerTable />
  </div>
);

export default Table;
