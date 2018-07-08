import React from 'react'
import { Label, Grid } from 'semantic-ui-react'

const Suggestions = ({suggestions, implementSuggestion}) => {
  const words = suggestions.map(word => Suggestion(word, implementSuggestion))
  return (
    <Grid id="suggestions" container columns={4} doubling stackable>
      {words}
    </Grid>
  )
}

const Suggestion = (word, implementSuggestion) => {
  return (
    <Grid.Column key={word}>
      <Label onClick={() => implementSuggestion(word)}>
        {word}
      </Label>
    </Grid.Column>
  )
}

export default Suggestions
