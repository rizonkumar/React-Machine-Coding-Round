# Problem Statement: Nested Checkbox Hierarchy

Create a nested checkbox system that supports any number of levels with the following behaviors:

1. **Parent-Child Check Propagation**:

   - If a checkbox is **checked/unchecked**, **all** its descendant checkboxes should automatically become **checked/unchecked**.

2. **Auto-Check Parent When All Children Are Checked**:

   - If **all** descendants of a checkbox are checked, the parent checkbox should **automatically** become checked.

3. **Auto-Uncheck Parent When Any Child Is Unchecked**:
   - If **any** descendant of a checkbox is unchecked, the parent checkbox should **automatically** become unchecked.

### Example:

```

- [ ] Parent
  - [ ] Child 1
    - [ ] Grandchild 1
  - [ ] Child 2

```

- Checking "Parent" should check all descendants (Child 1, Child 2, Grandchild 1).
- Unchecking "Grandchild 1" should uncheck "Child 1" and "Parent".
- Checking both "Grandchild 1" and "Child 2" should auto-check "Parent".
