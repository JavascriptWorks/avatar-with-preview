/** @jsx React.DOM */

var Avatar = React.createClass({
  getDefaultProps: function() {
    return {
      height: 150,
      width: 150,
      size: 50
    };
  },

  //To show image preview, when a file is passed to the input field,
  //retrieve the contents as a base64-encoded data URI
  loadFile: function(event) {
    var maxHeight = this.props.height,
        maxWidth = this.props.width,
        maxSize = this.props.size;
    var reader = new FileReader(),
        image  = new Image(),
        output = document.getElementById('imgPreview'),
        file = event.target.files[0];
    reader.onload = function() {
      var errMessage = "Oops!, something has gone awry.";
      image.src = reader.result;
      image.onload = function() {
        var height = this.height,
            width = this.width,
            name = file.name,
            size = ~~(file.size/1024); //in KBs
        if (height>maxHeight || width>maxWidth) {
          this.errMessage = "The height and width of an image should NOT be greater than " +
                            maxHeight + "px and " + maxWidth + "px.";
          $(this).trigger('error');
          return;
        }
        if (size > maxSize) {
          this.errMessage = "The size of image should NOT be greater than " + maxSize + "kb.";
          $(this).trigger('error');
          return;
        }
        output.src = reader.result;
      };
      image.onerror= function(event) {
        output.src = '#';
        document.getElementById('imgInput').value = ''; //Clear Input Value
        if(this.errMessage) {
          alert(this.errMessage);
        } else {
          alert("Please upload an image file.");
        }
      };
    };
    if(event.target.files.length>0) {
      var imgFile = event.target.files[0];
      reader.readAsDataURL(imgFile);
    } else {
      output.src = '#';
    }
  },

  render: function() {
    return (
      <div class='gravatarPlaceholder'>
        <img id="imgPreview" src="#" class="img-r­ounded img-r­esp­onsive" alt="Gravatar Image Preview" />
        <input type="file" id="imgInput" onChange={this.loadFile} />
      </div>
    );
  }
});
