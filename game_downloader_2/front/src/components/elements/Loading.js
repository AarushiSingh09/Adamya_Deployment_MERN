import React from 'react';
let LoadingGif = <div className="loader center">
<i className="fa fa-cog fa-8x fa-spin" />
</div>;
function Loading() {
  return (
    <div className="loader center">
      <i className="fa fa-cog fa-8x fa-spin" />
    </div>
  );
}

export  {Loading,LoadingGif};