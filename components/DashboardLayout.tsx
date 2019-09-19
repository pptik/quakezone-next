import {
  AppBar,
  Badge,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link as MaterialUiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  Avatar,
  Icon
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import WorkIcon from "@material-ui/icons/Work";
import clsx from "clsx";
import Link from "next/link";
import React, { FunctionComponent } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      QuakeZone
      {" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  avatarIcon: {
    marginRight: "1rem",
    backgroundColor: theme.palette.primary.main,
    fontSize: "3rem"
  }
}));

// function ListItemLink(props: {icon: any, primary: string, href:}) {
//     const { icon, primary, href } = props;

//     const renderLink = React.useMemo(
//       () =>
//         React.forwardRef((itemProps, ref) => (
//           // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
//           <Link href={href} {...itemProps} innerRef={ref} />
//         )),
//       [href],
//     );

//     return (
//       <li>
//         <ListItem button component={renderLink}>
//           <ListItemIcon>{icon}</ListItemIcon>
//           <ListItemText primary={primary} />
//         </ListItem>
//       </li>
//     );
//   }

interface Props {
  children: any;
  title?: string;
  avatarUrl?: string;
  avatarIcon?: string;
  avatarIconSet?: "Ionicons" | undefined;
}

const DashboardLayout: FunctionComponent<Props> = ({
  children, title, avatarUrl, avatarIcon, avatarIconSet
}) => {
  title = title || "QuakeZone";
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    console.debug("drawer open");
    setOpen(true);
  };
  const handleDrawerClose = () => {
    console.debug("drawer closed");
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          {avatarUrl && !avatarIcon && <Avatar src={avatarUrl} style={{background: "white", marginRight: "1rem"}} />}
          {avatarIcon &&
            <Avatar className={classes.avatarIcon}>
                {React.createElement("ion-icon", {name: avatarIcon})}
            </Avatar>}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link href="/">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          
          <Link href="/tips-saat-gempa">
            <ListItem button>
              <ListItemIcon>
                
                {React.createElement('ion-icon', {
                  name: "paw",
                  style: {fontSize: "x-large"}})}
                
              </ListItemIcon>
              <ListItemText primary="Tips Saat Gempa" />
            </ListItem>
          </Link>
          
          <Link href="/quakes">
            <ListItem button>
              <ListItemIcon>
                
                {React.createElement('ion-icon', {
                  name: "wifi",
                  style: {fontSize: "x-large"}})}
                
              </ListItemIcon>
              <ListItemText primary="Earthquakes" />
            </ListItem>
          </Link>
          
          <Link href="/tsunamis">
            <ListItem button>
              <ListItemIcon>
                
                {React.createElement('ion-icon', {
                  name: "water",
                  style: {fontSize: "x-large"}})}
                
              </ListItemIcon>
              <ListItemText primary="Tsunamis" />
            </ListItem>
          </Link>
          
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
        <Copyright />
      </main>
    </div>
  );
};

export default DashboardLayout;
