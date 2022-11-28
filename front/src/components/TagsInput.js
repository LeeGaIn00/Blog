import React, { useState } from 'react';
import { Input, Form, FormFeedback } from 'reactstrap';

const TagsInput = (props) => {
    const [tags, setTags] = useState([]);
    const [validate, setValidate] = useState();

    const addTag = (e) => {
        const tagRex = /^[^ !@#$%^&*(),.?":{}|<>]*$/gi; // 해시태그 정규표현식 (특수문자,공백 제외)
        if (e.key === "Enter" && e.target.value !== "") {   // 엔터키 + 한 글자 이상상
            if (tagRex.test(e.target.value)) { 
                if(!tags.includes(e.target.value)) {    // 중복 제외
                    setValidate("has-success");
                    setTags([...tags, e.target.value]);
                    props.createdTags([...tags, e.target.value]);
                }
                e.target.value = "";
            } else {
                setValidate("has-danger");
            }
        }
    };

    const removeTag = (indexToRemove) => {
        props.createdTags([...tags.filter((_, index) => index !== indexToRemove)]);
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    return (
        <div className="tags-input">
            <ul id="tags">
                {tags.map((tag, index) => (
                    <li key={index} className="tag">
                        <span className="tag-title">#{tag}</span>
                        <span
                            className="tag-close-icon"
                            onClick={() => removeTag(index)}
                        >
                            x
                        </span>
                    </li>
                ))}
            </ul>
            <Input
                placeholder="태그를 입력하세요"
                valid={validate === "has-success"}
                invalid={validate === "has-danger"}
                onKeyUp={event => addTag(event)}
            />
            <FormFeedback>
                태그는 특수문자 및 공백을 포함하지 않아야 합니다.
            </FormFeedback>
        </div>
    );
};

export default TagsInput;