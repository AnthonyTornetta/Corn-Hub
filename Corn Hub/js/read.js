function read(id, text, timeout, sayDone, wpm, callback)
{
    setTimeout(() =>
    {
        let thing = document.getElementById(id);

        let splitUp = text.replace(/\n/g, " ").split(' ');

        let i = 0;

        let interval = setInterval(() =>
        {
            if(i >= splitUp.length)
            {
                clearInterval(interval);

                if(sayDone)
                    thing.innerHTML = 'Done!';

                callback();
            }
            else
            {
                thing.innerHTML = splitUp[i];

                i++;
            }
        }, (60.0 * 1000) / wpm); // About wpm words per minute is what the brain can process
    }, timeout ? timeout : 0);
}

function initReader()
{
    $("#read-form").on('submit', function(e)
    {
        e.preventDefault();

        let text = $('#speedread').val();

        if(!text)
            alert('Fill in the text box below of what to speed read!');
        else
        {
            let wpm = Number(prompt('How many words per minute do you want?', '450'));
            
            if(wpm === NaN)
                alert('That has to be a number');
            else
            {
                read('wordsHere', '10 9 8 7 6 5 4 3 2 1', 0, false, wpm, 
                () => read('wordsHere', text, wpm / 60 * 10, true, wpm));
            }
        }

        return false;
    });
}