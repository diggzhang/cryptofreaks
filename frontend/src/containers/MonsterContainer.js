import React from 'react';
import { object } from 'prop-types';
import Monster from 'components/Monster';
import { CONTRACT_NAME } from 'config';

class MonsterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monster: null,
      loading: true,
      error: false,
      monsterID: props.match.params.monsterID,
    };
  }

  componentWillMount() {
    const contract = this.context.drizzle.contracts[CONTRACT_NAME];
    const { monsterID } = this.state;

    contract.methods.getMonster(monsterID).call().then((monster) => {

      this.setState({
        monster: {
          id: parseInt(monsterID, 10),
          name: 'CryptoMon',
          owner: monster.owner,
          genes: String(monster.genes),
          generation: parseInt(monster.generation, 10),
        },
        loading: false,
      });
    }).catch(() => {
      this.setState({
        loading: false,
        error: true,
      });
    });
  }

  render() {
    const {
      monster,
      error,
      loading,
    } = this.state;

    if (error) {
      return (
        <h1>
          Monster not found
        </h1>
      )
    }

    return (
      <div>
        {
          !loading && monster ? (
            <Monster {...monster} />
          ) : (
            <div>Loading monster</div>
          )
        }
      </div>
    )
  }
}

MonsterContainer.contextTypes = {
  drizzle: object,
};

export default MonsterContainer;
