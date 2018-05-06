import React from 'react';
import history from '../history';
import Container from '../components/Container/Container';
import Button from '../components/Button/Button';
import MainMenu from '../containers/MainMenu/MainMenu';

const AppView = (props) => {
    return (
        <Container>
            <MainMenu />
            <p>
                <Button
                    type='button'
                    onClick={() => {
                        history.push('/third');
                    }}
                >
                    Open third page programmatically
                </Button>
            </p>

            <hr />

            {props.children}
        </Container>
    );
};

export default AppView;
