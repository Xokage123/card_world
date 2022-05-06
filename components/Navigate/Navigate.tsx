import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import cn from 'classnames'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import styles from './navigate.module.scss';
import { navigateItems } from 'const/links';

export const Navigate: FC = () => {
  const router = useRouter()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <List classes={{
            root: styles.list
          }}>
            {
              navigateItems.map(item => {
                const { url, name } = item

                return (
                  <ListItem key={url}>
                    <ListItemText>
                      <Link href={url}>
                        {name}
                      </Link>
                    </ListItemText>
                  </ListItem>
                )
              })
            }
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
