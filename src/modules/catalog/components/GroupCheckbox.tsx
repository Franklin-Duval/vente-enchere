import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useState } from 'react';

export const GroupCheckbox = ({
  title,
  content,
  selectedValues,
}: {
  title: string;
  content: string[];
  selectedValues: (value: string[]) => void;
}) => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? content : []);
    setCheckAll(e.target.checked);
    selectedValues(content);
  };

  return (
    <div>
      <Checkbox onChange={onCheckAllChange} checked={checkAll}>
        {title}
      </Checkbox>

      <Checkbox.Group
        options={content}
        value={checkedList}
        style={{ marginLeft: 20, marginTop: 10 }}
        onChange={(list) => {
          setCheckedList(list);
          selectedValues(list as []);
          setCheckAll(list.length === content.length);
        }}
      />
    </div>
  );
};
