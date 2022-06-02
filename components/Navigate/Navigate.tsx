import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil';
import cn from 'classnames'

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import { LINKS } from 'const/links';

import { atom_userInformation } from 'reacoil/atoms/user';

import { navigateItems } from 'const/links';

import styles from './navigate.module.scss';
import { LocalKeys } from 'api/const';
import { removeLocalStorageValue } from 'helpers/local_storage';

export const Navigate: FC = () => {
  const userInfirmation = useRecoilValue(atom_userInformation)

  const router = useRouter()

  const handleAuth = () => {
    removeLocalStorageValue(LocalKeys.status_auth)
    
    router.push({
      pathname: LINKS.auth
    })
  }

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
          <List
            classes={{
              root: styles.list
            }}
          >
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

          {
            userInfirmation ?
              (
                <Typography variant='body1'>Вы аторизированы</Typography>
              )
              :
              (
                <Button onClick={handleAuth} variant='contained'>Авторизироваться</Button>
              )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
