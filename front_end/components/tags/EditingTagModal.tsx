import * as React from "react";
import Tag from "../../models/Tag";

const styles =  {
  width:  '100%',
  height: 200,
  backgroundColor: '#f3f3f3'
}

interface Props {
  tag: Tag
}

const EditingTagModal = React.forwardRef((props: Props, ref: any) => {
  return (
    <div ref={ref} style={styles}>
      <p>{props.tag.name}</p>
      <p>{props.tag.color}</p>
      <p>更新</p>
    </div>
  );
});

export default EditingTagModal
