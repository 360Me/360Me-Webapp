/*
 * Simple test to make sure RemoveReviewButton renders  correctly
 */

import React from 'react/addons';
let { TestUtils } = React.addons;

import RemoveReviewButton from '../src/modules/reviews/components/RemoveReviewButton';


describe("RemoveReviewButton Component", function() {
  it("should render a button", function() {

     // Render a checkbox with label in the document
    let buttonComponent = TestUtils.renderIntoDocument(
      <RemoveReviewButton />
    );

    let button = TestUtils.findRenderedDOMComponentWithTag(
      buttonComponent, 'button');

    expect(button.getDOMNode().textContent).to.equal('Test');
  });
});