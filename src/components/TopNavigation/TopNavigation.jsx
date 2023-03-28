import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TopNavigation = ({ title, arrow, bookmark, search, menu }) => {
    return (
        <div className={`topNavigation d-flex-center ${!title && 'padding'}`}>
            {arrow && <ArrowBackIcon className="arrowIcon" />}
            {title && <h3>{title}</h3>}
            {bookmark && <BookmarkIcon className="bookmarkIcon" />}
            {search && <SearchIcon className="searchIcon" />}
            {menu && <MoreVertIcon className="menuIcon" />}
        </div>
    );
};

export default TopNavigation;
