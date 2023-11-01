import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { NavLink } from 'react-router-dom';
import { IPost } from '../..';

import { HeaderContainer, PostInfo } from './styles';
import {
    ArrowArcLeft,
    ArrowSquareOut,
    Calendar,
    ChatText,
    GithubLogo,
} from 'phosphor-react';

interface PostHeaderProps {
    post: IPost;
}

export function PostHeader({ post }: PostHeaderProps) {
    const timeDistanceToNow = formatDistanceToNow(new Date(post!.created_at), {
        addSuffix: true,
        locale: ptBR,
    });
    const commentsFormated = `${post.comments} ${
        post.comments === 1 ? 'comentário' : 'comentários'
    }`;

    return (
        <HeaderContainer>
            <nav>
                <NavLink to="/">
                    <ArrowArcLeft size={24} />
                    <span>VOLTAR</span>
                </NavLink>
                <a href={post.html_url} target="_blank" rel="noreferrer">
                    <span>VER NO GITHUB</span>
                    <ArrowSquareOut size={20} />
                </a>
            </nav>
            <h1>{post.title}</h1>
            <PostInfo>
                <div>
                    <GithubLogo size={24} weight="fill" />
                    <span>{post.user.login}</span>
                </div>
                <div>
                    <Calendar size={24} weight="fill" />
                    <span>{timeDistanceToNow}</span>
                </div>
                <div>
                    <ChatText size={24} weight="fill" />
                    <span>{commentsFormated}</span>
                </div>
            </PostInfo>
        </HeaderContainer>
    );
}
