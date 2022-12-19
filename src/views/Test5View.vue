<template>
    <div draggable="true" @dragend="onDragEnd">Drag me</div>
    <div>
        box1
    </div>
    <div>
        box2
    </div>
    <div>
        box3
    </div>
</template>

<script>
export default {
    methods: {
        onDragEnd(event) {
            console.log(event.currentTarget);
            // The event.currentTarget property will hold a reference to the element with the @dragend directive (the root element of the component)
        },
    },
};
</script>
