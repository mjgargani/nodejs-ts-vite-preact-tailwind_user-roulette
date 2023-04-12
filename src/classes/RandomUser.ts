import { type Nationalities, type RandomUserProps } from './types';

class RandomUser implements RandomUserProps {
  public props: RandomUserProps['props'] = {
    url: 'https://randomuser.me/api/',
    format: 'json',
    version: '1.4',
  };

  constructor({
    results,
    gender,
    password,
    seed,
    nat,
  }: { nat: Nationalities['1.4'] } & Partial<RandomUserProps['props']>) {
    this.props.results = results;
    this.props.gender = gender;
    this.props.password = password;
    this.props.seed = seed;
    this.props.nat = nat;
  }
}

export default RandomUser;
