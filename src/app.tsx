import React from 'preact/compat';

import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import RandomUser from './classes/RandomUser';
import Card from './components/Card';
import MainContainer from './components/MainContainer';
import { type RandomUserResponse } from './classes/types';

export function App() {
  const [users, setUsers] = useState<RandomUserResponse>();
  const [isUpdating, setIsUpdating] = useState<boolean>(true);

  const retriveUsers = async () => {
    setIsUpdating(true);

    const data: RandomUser = new RandomUser({
      results: 7,
      format: 'json',
      nat: ['br'],
    });

    data
      .retrieve()
      .then((response) => {
        setUsers(response as RandomUserResponse);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  useEffect(() => {
    retriveUsers();
  }, []);

  return (
    <MainContainer>
      <button data-testid="test_update_btn" onClick={retriveUsers} disabled={isUpdating}>
        Atualizar
      </button>
      {users?.results.length &&
        users.results.map((el, i) => (
          <Card key={`${i}_${Date.now()}`} id={`user_card_${i}`} testId={`test_user_card_${i}`}>
            {[el.name.title, el.name.first, el.name.last].join(' ')}
          </Card>
        ))}
    </MainContainer>
  );
}
