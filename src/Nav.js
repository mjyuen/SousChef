import React from 'react';
import { Navbar, NavLink } from 'reactstrap';

class Nav extends React.Component {

    render() {
        return (
            <Navbar color="light" light expand="md">
                <ul>
                       <NavLink href="/">
                        <a>Home</a>
                       </NavLink>

                </ul>
            </Navbar>

        )
    }
}
export default Nav;