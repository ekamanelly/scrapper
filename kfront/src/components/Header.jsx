import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { PostContent } from '../store/PostProvider';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    text_color: {
        color: '#fff'
    },
    backgroundColor:{
        backgroundColor: '#020202'

    }

}));

const Header = (props) => {
    return ( 
        <h3>
            header
        </h3>
     );
}
 
export default Header;


// const Header = (props) => {
//     const setPost = useContext(PostContent)[1];
//     useEffect(() => {
//         async function fetchPost() {
//             let { data } = await axios('https://kpeki.herokuapp.com/getpost');
//             setPost(data)
//         }
//         fetchPost()
//     })
//     // const[post, setPost]= useContext(PostContent)
//     const classes = useStyles();
//     return ( 
//         <div className={classes.root}>

//             <AppBar position="fixed" className={classes.backgroundColor}  >
//                 <Toolbar variant="dense">
//                     <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//                         {/* <MenuIcon /> */}
//                     </IconButton>
//                     <Link to='/'>
//                         <Typography variant="h6" className={classes.text_color} >                        
//                             Kpeki                        
//                     </Typography>
//                     </Link>
//            </Toolbar>
//             </AppBar>
//         </div>
//      );
// }
 
// export default Header;