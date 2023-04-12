import {
  type RandomUserResponse,
  type Nationalities,
  type RandomUserProps,
  type RandomUserResponseError,
} from './types';

const contentType = (type: RandomUserProps['props']['format']) => {
  const types = {
    json: 'application/json',
    pretty: 'application/json',
    csv: 'text/csv',
    yaml: 'text/x-yaml',
    xml: 'text/xml',
  };

  return types[type];
};

class RandomUser implements RandomUserProps {
  public props: RandomUserProps['props'] = {
    url: 'https://randomuser.me/api/',
    format: 'json',
    version: '1.4',
  };

  public requestUrl: string;

  constructor({
    results,
    gender,
    password,
    seed,
    nat,
    page,
    inc,
    exc,
  }: { nat?: Array<Nationalities['1.4']> } & Partial<RandomUserProps['props']> = {}) {
    this.props.results = results;
    this.props.gender = gender;
    this.props.password = password;
    this.props.seed = seed;
    this.props.nat = nat;
    this.props.page = page;
    this.props.inc = inc;
    this.props.exc = exc;

    const query = [
      results ? `results=${results}` : undefined,
      gender ? `gender=${gender}` : undefined,
      password
        ? `password=${[password.charSets?.filter(Boolean).join(','), password.length].filter(Boolean).join(',')}`
        : undefined,
      seed ? `seed=${seed}` : undefined,
      nat ? `nat=${nat.filter(Boolean).join(',')}` : undefined,
      page ? `page=${page}` : undefined,
      inc ? `inc=${inc.filter(Boolean).join(',')}` : undefined,
      exc ? `exc=${exc.filter(Boolean).join(',')}` : undefined,
    ];

    this.requestUrl =
      `${this.props.url}${this.props.version}/` +
      `${query.filter(Boolean).length ? `?${query.filter(Boolean).join('&')}` : ''}`;
  }

  async retrieve(): Promise<RandomUserResponse | RandomUserResponseError | string> {
    const { format } = this.props;

    return fetch(this.requestUrl, {
      method: 'GET',
      headers: {
        'access-control-allow-origin': '*',
        'content-type': `${contentType(format)}; charset=utf-8`,
      },
    }).then(
      async (response): Promise<RandomUserResponse | RandomUserResponseError | string> =>
        ['json', 'pretty'].includes(format) ? response.json() : response.text(),
    );
  }
}

export default RandomUser;
