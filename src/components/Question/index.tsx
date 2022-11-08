import { User } from 'phosphor-react';
import { ReactNode } from 'react';

import cx from 'classnames'

import './styles.scss'

type QuestionProps = {
  author: {
    name: string,
    //sector: string,
    avatar: string,
  },
  content: string,
  children?: ReactNode,
  isAnswered?: boolean,
  isHighLighted?: boolean,
}

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighLighted = false,
}: QuestionProps) {


  return(
    <div 
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighLighted && !isAnswered },
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          {
            author.avatar ? (
              <img src={author.avatar} alt="Perfil" />
            ) : (
              <div className="avatar">
              <User
                weight='bold'
                color='#fff' 
              />
            </div>
                    )
                  }
          <div className="author-info">
            <span>{author.name}</span>
            <small>Setor:</small>
          </div>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}