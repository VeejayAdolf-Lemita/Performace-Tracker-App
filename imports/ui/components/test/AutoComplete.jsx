import React, { Component } from 'react';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.names = [
      'John',
      'Jane',
      'James',
      'Jennifer',
      'Jacob',
      'Jessica',
      'Jack',
      'Jasmine',
      'Jason',
      'Julia',
    ];

    this.state = {
      inputValue: '',
      suggestions: [],
    };
  }

  handleAddMemberChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    this.setState({
      inputValue: searchText,
      suggestions: this.names.filter((name) => name.toLowerCase().startsWith(searchText)),
    });
  };

  handleSuggestionClick = (suggestion) => {
    this.setState({
      inputValue: suggestion,
      suggestions: [],
    });
  };

  render() {
    console.log(typeof this.state.suggestions);
    console.log(this.state.indexValue);
    return (
      <div>
        <input
          type='text'
          value={this.state.inputValue}
          onChange={this.handleAddMemberChange}
          placeholder='Type a name'
          className='ry_text-field-style1 w-input'
        />
        <div>
          {this.state.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className='suggestion'
              onClick={() => this.handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Autocomplete;
