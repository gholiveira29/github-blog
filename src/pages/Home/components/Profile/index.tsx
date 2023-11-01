import { useTheme } from 'styled-components';

import {
    Avatar,
    Bio,
    Details,
    InfoContainer,
    ProfileContainer,
} from './styles';
import { useEffect, useState } from 'react';
import { api } from '../../../../lib/axios';
import { ArrowSquareOut, Buildings, GithubLogo, Users } from 'phosphor-react';

interface User {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    company: string | null;
    followers: number;
    html_url: string;
}

export function Profile() {
    const theme = useTheme();
    const [user, setUser] = useState<User>();

    const followers = user?.followers.toLocaleString('pt-BR');
    const formatedFollowers = `${followers} ${
        user?.followers === 1 ? 'seguidor' : 'seguidores'
    }`;

    async function fetchUserProfile() {
        const response = await api.get(`/users/gholiveira29`);

        setUser(response.data);
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <ProfileContainer>
            <Avatar src={user?.avatar_url} alt="" />
            <InfoContainer>
                <header>
                    <h2>{user?.name}</h2>
                    <a href={user?.html_url} target="_blank" rel="noreferrer">
                        {' '}
                        GITHUB <ArrowSquareOut size={20} />
                    </a>
                </header>
                <Bio>
                    <p>{user?.bio}</p>
                </Bio>
                <Details>
                    <div>
                        <GithubLogo
                            color={theme['base-label']}
                            size={24}
                            weight="fill"
                        />
                        <span>{user?.login}</span>
                    </div>
                    {user?.company && (
                        <div>
                            <Buildings
                                color={theme['base-label']}
                                size={24}
                                weight="fill"
                            />
                            <span>{user?.company}</span>
                        </div>
                    )}
                    <div>
                        <Users
                            color={theme['base-label']}
                            size={24}
                            weight="fill"
                        />
                        {<span>{formatedFollowers}</span>}
                    </div>
                </Details>
            </InfoContainer>
        </ProfileContainer>
    );
}
