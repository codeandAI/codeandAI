document.addEventListener('DOMContentLoaded', function() {
    // Simulated user progress (first lesson watched)
    let firstLessonWatched = true;

    const lessons = document.querySelectorAll('.lesson');
    lessons.forEach((lesson, index) => {
        const startLessonButton = lesson.querySelector('.start-lesson');
        // Enable the button for the first lesson
        if (index === 0) {
            startLessonButton.disabled = false;
        } else {
            // Disable the button for subsequent lessons if the first lesson is not watched
            if (!firstLessonWatched) {
                startLessonButton.disabled = true;
            } else {
                // Enable the button for subsequent lessons if the first lesson is watched
                startLessonButton.disabled = false;
            }
        }

        startLessonButton.addEventListener('click', function() {
            // Simulated lesson start
            console.log(`Starting Lesson ${index + 1}`);
        });
    });
});
