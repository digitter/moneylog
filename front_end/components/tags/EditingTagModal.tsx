import * as React from "react";
import Tag from "../../models/Tag";

const styles =  {
  width:  '100%',
  height: 300,
  position: 'absolute' as 'absolute',
  backgroundColor: '#f8f8ff'
}

interface Props {
  tag: Tag
}

const EditingTagModal = React.forwardRef((props: Props, ref: any) => {
  return (
    <div ref={ref} style={styles}>
      <p>{props.tag.name}</p>
      <p>{props.tag.color}</p>
      <p>編集</p>
      <p>削除</p>
    </div>
  );
});

export default EditingTagModal
