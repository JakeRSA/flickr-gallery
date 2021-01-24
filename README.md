# Flickr Gallery

Welcome to the Flickr Gallery application.
This app is simple, you write a tag at the top and you get images from flickr with that tag.

Deployed to `https://jakersa.github.io/flickr-gallery/`

## Tasks

### Image Actions
Each image has three buttons that appear on mouse hover.
1. Delete: clicking the delete button should remove the image from the display.
2. Rotate: each click should rotate the image by 90 degrees.
3. Expand: clicking an image should display this image in a larger view.

### Gallery Actions
1. Responsive:  the gallery adjusts the size of each image so that all the images will fit into the screen without margin, even when the window is resized.
2. Infinite Scroll: images are loaded in batches of 100 images. When the user approaches the bottom of the gallery. Another 100 images are loaded
3. Drag & Drop: Users can choose the order of the images by dragging & dropping images to their new position.

### Wrapping Up
1. Added a feature to play around with image filters when in full-size view. These filters are also applied to the smaller images so the user can create further customise the gallery.
2. Also in the name of better customization, the gallery image size can be tweaked using a slider.
3. Added a download image button

## Considerations

### Use of class components
I have vouched not to refactor the class components to functional components. Although functional components have additional functionality like hooks and React recommends adopting functional components, I decided to stick with the challenge of working as much as possible with the existing code.

### Refactored to use create-react-app
It was a struggle to deploy to Github pages given that a lot of the documentation, including React and Github's documentation, are focused on the create-react-app setup. So I chose to refactor the code to work with create-react-app.

### Testing
There are some basic test suites but they have low coverage. Given more time, I would have implemented more tests.


