import React from 'react';
import { Octokit } from '@octokit/rest';
import Card from '@material-ui/core/Card';
import Repos from '../Repos/Repos';
import styles from './About.module.css';
import emailImg from './img/email.svg';
import telegramImg from './img/telegram.svg';
import githubImg from './img/github.svg';
import vkImg from './img/vk.svg';
import linkedinImg from './img/linkedin.svg';
import facebookImg from './img/facebook.svg';

const octokit = new Octokit();

class About extends React.Component {
    state = {
        isLoading: true,
        isError: false,
        errorText: '',
        user: []
    }

    componentDidMount() {
        octokit.users.getByUsername({
            username: 'IlyaKd'
        }).then(({ data }) => {
            this.setState({
                user: data,
                isLoading: false
            });
        }).catch(() => {
            this.setState({
                isLoading: false,
                isError: true,
                errorText: 'Ошибка, пользователь не найден!'
            });
        });
    }

    render() {
        const { isLoading, isError, errorText,  user } = this.state;

        return (
            <div className={styles.wrap}>
                <Card className={styles.user_card}>
                    { isLoading ? <div className={styles.preloader}></div> :
                        <div>
                            { isError ? <div className={styles.error}>{errorText}</div> :
                                <div className={styles.inner}>
                                    <img src={user.avatar_url} className={styles.avatar}></img>
                                    <div className={styles.info}>
                                        <div className={styles.description}>
                                            <p className={styles.name}>{user.login}</p>
                                            <p className={styles.bio}>{user.bio}</p>
                                            <a className={styles.contact} href='mailto: ilyakd@gmail.com'>
                                                <img className={styles.contact__img} src={ emailImg } alt='Email'></img>
                                                ilyakd@gmail.com
                                            </a>
                                            <a className={styles.contact} href='tg://resolve?domain='>
                                                <img className={styles.contact__img} src={ telegramImg } alt='Telegram'></img>
                                                +7(917)741-91-97
                                            </a>
                                        </div>
                                        <div className={styles.social_networks}>
                                            <a href='https://github.com/IlyaKd' target='_blank' rel='noopener noreferrer'>
                                                <img src={ githubImg } alt='Github' className={styles.social_networks__img}></img>
                                            </a>
                                            <a href='https://vk.com/' target='_blank' rel='noopener noreferrer'>
                                                <img src={ vkImg } alt='VK' className={styles.social_networks__img}></img>
                                            </a>
                                            <a href='https://linkedin.com/' target='_blank' rel='noopener noreferrer'>
                                                <img src={ linkedinImg } alt='Linkedin' className={styles.social_networks__img}></img>
                                            </a>
                                            <a href='https://facebook.com/' target='_blank' rel='noopener noreferrer'>
                                                <img src={ facebookImg } alt='Facebook' className={styles.social_networks__img}></img>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </Card>
                <Repos />
            </div>
        );
    }
}

export default About;